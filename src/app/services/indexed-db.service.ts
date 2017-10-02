import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * @name IndexedDbService
 * @description
 * This Service is used for creating and transacting with the data in the DB.
 * All functions create and return Ovservables using rxjs which makes it easy to use.
 */
@Injectable()
export class IndexedDbService {

	private indexedDB: any;
    private dbName: string;

    constructor() {
        this.indexedDB = indexedDB;
        this.dbName = 'futball'; // by default
    }

	// set the name of the db
	setName(dbName: string): void {
		if (dbName.length > 0 && dbName !== undefined) {
			this.dbName = dbName;
		}else {
			console.log('Error: wrong dbName');
		}
	}

	// used for updating/adding objects to a provided objectstore
	put(source: string, object: any): Observable<any> {

		return Observable.create((observer: any) => {
			this.open().subscribe((db: any) => {
				const tx = db.transaction(source, 'readwrite');
				const store = tx.objectStore(source);
				store.put(object);

				tx.oncomplete = () => {
					observer.next(object);
					db.close();
					observer.complete();
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// used for adding objects to a provided objectstore
	post(source: string, object: any): Observable<any> {

		return Observable.create((observer: any) => {
			this.open().subscribe((db: any) => {
				const tx = db.transaction(source, 'readwrite');
				const store = tx.objectStore(source);
				const request = store.add(object);

				request.onsuccess = (e: any) => {
					observer.next(e.target.result);
					db.close();
					observer.complete();
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// used for getting object from the provided objectstore
	// based on the index provided.
	get(source: string, id: any, indexName?: string): Observable<any> {

		return Observable.create((observer: any) => {
			this.open().subscribe((db: any) => {
				const tx = db.transaction(source, 'readonly');
				const store = tx.objectStore(source);
				const index = (indexName) ? store.index(`${indexName}_idx`) : store.index('id_idx');
				const request = index.get(id);

				request.onsuccess = () => {
					observer.next(request.result);
					db.close();
					observer.complete();
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// used for getting all objects from a provided objectstore
	all(source: string, filter?: any): Observable<any[]> {

		return Observable.create((observer: any) => {
			const indexName = 'id_idx';

			this.open().subscribe((db: any) => {
				const tx = db.transaction(source, 'readonly');
				const store = tx.objectStore(source);
				const index = store.index(indexName);
				const request = index.openCursor(); // IDBKeyRange.only("Fred")
				const results: any[] = [];

				request.onsuccess = function () {
					const cursor = request.result;
					if (cursor) {
						results.push(cursor.value);
						cursor.continue();
					} else {
						observer.next(results);
						db.close();
						observer.complete();
					}
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// not used yet but works: will be used for removing object with given id
	// from a provided objectstore
	remove(source: string, id: number): Observable<any> {
		return Observable.create((observer: any) => {
			this.open().subscribe((db: any) => {
				const tx = db.transaction(source, 'readwrite');
				const store = tx.objectStore(source);

				store.delete(id);

				tx.oncomplete = (e: any) => {
					observer.next(id);
					db.close();
					observer.complete();
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// not used yet but works: will be used for counting objects
	// in a provided objectstore
	count(source: string): Observable<number> {

		return Observable.create((observer: any) => {
			this.open().subscribe((db: any) => {
				const indexName = 'id_idx';
				const tx = db.transaction(source, 'readonly');
				const store = tx.objectStore(source);
				const index = store.index(indexName);
				const request = index.count();

				request.onsuccess = () => {
					observer.next(request.result);
					db.close();
					observer.complete();
				};
				db.onerror = (e: any) => {
					db.close();
					this.handleError('IndexedDB error: ' + e.target.errorCode);
				};
			});
		});
	}

	// creates and populates the db with the schema provided
	create(schema?: any[]): Observable<any> {
		return Observable.create((observer: any) => {
			const request = this.indexedDB.open(this.dbName);

			request.onupgradeneeded = () => {
				// The database did not previously exist, so create object stores and indexes.
				const db = request.result;

				for (let i = 0; i < schema.length; i++) {
					const store = db.createObjectStore(schema[i].name, { keyPath: 'id', autoIncrement: true });
					store.createIndex('id_idx', 'id', { unique: true });

					if (schema[i].indexes !== undefined) {
						for (let j = 0; j < schema[i].indexes.length; j++) {
							const index = schema[i].indexes[j];
							store.createIndex(`${index}_idx`, index);
						}
					}

					if (schema[i].seeds !== undefined) {
						for (let j = 0; j < schema[i].seeds.length; j++) {
							const seed = schema[i].seeds[j];
							store.put(seed);
						}
					}
				}

				observer.next('done');
				observer.complete();
			};

			request.onerror = () => {
				this.handleError(request.error);
			};

			request.onsuccess = () => {
				const db = request.result;
				db.close();
			};
		});
	}

	// not used yet but works: will be used for checking if the db is present or not
	// very handy in dev env to avoid excess API calls
	checkAvaibale(dbName?: string): Observable<any> {
		return Observable.create((observer: any) => {
			dbName = (dbName) ? dbName : this.dbName;
			const request = this.indexedDB.open(dbName);
			request.onsuccess = () => {
				const available = (request.result.objectStoreNames.length === 0) ? false : true;
				observer.next(available);
				observer.complete();
				request.result.close();
			};
			request.onerror = () => {
				this.handleError(request.error);
			};

		});
	}

	// delete the db
	clear(): Observable<any> {

		return Observable.create((observer: any) => {
			const request = this.indexedDB.deleteDatabase(this.dbName);

			request.onsuccess = () => {
				observer.next('done');
				observer.complete();
			};
			request.onerror = () => {
				this.handleError('Could not delete indexed db.');
			};
			request.onblocked = () => {
				this.handleError('Couldn not delete database due to the operation being blocked.');
			};
		});
	}

	private handleError(msg: string) {
		return Observable.throw(msg);
	}

	// open connection the db
	private open(): Observable<any> {
		return Observable.create((observer: any) => {
			const request = this.indexedDB.open(this.dbName);

			request.onsuccess = () => {
				observer.next(request.result);
				observer.complete();
			};
			request.onerror = () => this.handleError(request.error);
		});
	}
}
