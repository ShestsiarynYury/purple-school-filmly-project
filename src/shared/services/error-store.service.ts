import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IErrorModel {
    code: number | null;
    message: string | null;
    url: string | null;
    time: string | null;
}

export const STORE_INITIAL_VALUES: IErrorModel[] = [];

@Injectable({ providedIn: 'root' })
export class ErrorStoreService {
    private readonly _storeSubject = new BehaviorSubject<IErrorModel[]>(STORE_INITIAL_VALUES);

    // getter
    // отдает значение но синхронно
    getValue(): IErrorModel[] {
        return this._storeSubject.getValue();
    }

    reset(): void {
        return this._storeSubject.next(STORE_INITIAL_VALUES);
    }

    // отдает значение но асинхронно
    getValueAsync(): Observable<IErrorModel[]> {
        return this._storeSubject.asObservable();
    }

    // setter
    setValue(value: IErrorModel): void {
        this._storeSubject.next([...this._storeSubject.getValue(), value]);
    }
}
