/**
 * Generic Porta;
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Item } from '../model/item';
import { SingleResultItem } from '../model/singleResultItem';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ItemService {

    protected basePath = 'https://genericportalbackend.azurewebsites.net';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param id 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemDeleteItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public itemDeleteItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public itemDeleteItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public itemDeleteItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemDeleteItem.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemDeleteItem.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemDeleteItem.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/api/Item/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemDeleteItem_1(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public itemDeleteItem_1(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public itemDeleteItem_1(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public itemDeleteItem_1(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemDeleteItem_1.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemDeleteItem_1.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemDeleteItem_1.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/tables/Item/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemGetAllItems(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Item>>;
    public itemGetAllItems(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Item>>>;
    public itemGetAllItems(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Item>>>;
    public itemGetAllItems(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemGetAllItems.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemGetAllItems.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Array<Item>>(`${this.basePath}/api/Item`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemGetAllItems_2(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Item>>;
    public itemGetAllItems_2(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Item>>>;
    public itemGetAllItems_2(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Item>>>;
    public itemGetAllItems_2(ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemGetAllItems_2.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemGetAllItems_2.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<Array<Item>>(`${this.basePath}/tables/Item`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemGetItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<SingleResultItem>;
    public itemGetItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SingleResultItem>>;
    public itemGetItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SingleResultItem>>;
    public itemGetItem(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemGetItem.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemGetItem.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemGetItem.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<SingleResultItem>(`${this.basePath}/api/Item/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemGetItem_3(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<SingleResultItem>;
    public itemGetItem_3(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SingleResultItem>>;
    public itemGetItem_3(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SingleResultItem>>;
    public itemGetItem_3(id: string, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemGetItem_3.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemGetItem_3.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemGetItem_3.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<SingleResultItem>(`${this.basePath}/tables/Item/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param patch 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemPatchItem(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<Item>;
    public itemPatchItem(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Item>>;
    public itemPatchItem(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Item>>;
    public itemPatchItem(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemPatchItem.');
        }
        if (patch === null || patch === undefined) {
            throw new Error('Required parameter patch was null or undefined when calling itemPatchItem.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemPatchItem.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemPatchItem.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'text/json',
            'application/x-www-form-urlencoded'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.patch<Item>(`${this.basePath}/api/Item/${encodeURIComponent(String(id))}`,
            patch,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param patch 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemPatchItem_4(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<Item>;
    public itemPatchItem_4(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Item>>;
    public itemPatchItem_4(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Item>>;
    public itemPatchItem_4(id: string, patch: any, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling itemPatchItem_4.');
        }
        if (patch === null || patch === undefined) {
            throw new Error('Required parameter patch was null or undefined when calling itemPatchItem_4.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemPatchItem_4.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemPatchItem_4.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'text/json',
            'application/x-www-form-urlencoded'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.patch<Item>(`${this.basePath}/tables/Item/${encodeURIComponent(String(id))}`,
            patch,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param item 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemPostItem(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public itemPostItem(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public itemPostItem(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public itemPostItem(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling itemPostItem.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemPostItem.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemPostItem.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'text/json',
            'application/x-www-form-urlencoded'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/api/Item`,
            item,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param item 
     * @param ZUMO_API_VERSION 
     * @param X_ZUMO_AUTH 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public itemPostItem_5(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public itemPostItem_5(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public itemPostItem_5(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public itemPostItem_5(item: Item, ZUMO_API_VERSION: string, X_ZUMO_AUTH: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling itemPostItem_5.');
        }
        if (ZUMO_API_VERSION === null || ZUMO_API_VERSION === undefined) {
            throw new Error('Required parameter ZUMO_API_VERSION was null or undefined when calling itemPostItem_5.');
        }
        if (X_ZUMO_AUTH === null || X_ZUMO_AUTH === undefined) {
            throw new Error('Required parameter X_ZUMO_AUTH was null or undefined when calling itemPostItem_5.');
        }

        let headers = this.defaultHeaders;
        if (ZUMO_API_VERSION !== undefined && ZUMO_API_VERSION !== null) {
            headers = headers.set('ZUMO-API-VERSION', String(ZUMO_API_VERSION));
        }
        if (X_ZUMO_AUTH !== undefined && X_ZUMO_AUTH !== null) {
            headers = headers.set('X-ZUMO-AUTH', String(X_ZUMO_AUTH));
        }

        // authentication (facebook) required
        if (this.configuration.accessToken) {
            let accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'text/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'text/json',
            'application/x-www-form-urlencoded'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/tables/Item`,
            item,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
