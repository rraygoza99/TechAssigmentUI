import { Injectable } from "@angular/core";
import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskData } from "./app.component";
@Injectable()
export class ApiHttpService{
    constructor(private http: HttpClient){

    }
    private getToken(): string {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzI3NzM1MDEwLCJleHAiOjE3Mjc3MzUwMTB9.1AotpQk7VLuGNOIF6ZeDy05S9oV9Ww2uZjZtWcbwxHY';
    }
    public get(
        url: string, 
        options?: {
            headers?: HttpHeaders | { [header: string]: string | string[] };
            context?: HttpContext;
            observe?: 'body';
            params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
            transferCache?: { includeHeaders?: string[] } | boolean;
        }
    ): Observable<Object> {
        const token = this.getToken();

        let headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        if (options?.headers) {
            const existingHeaders = options.headers instanceof HttpHeaders ? options.headers : new HttpHeaders(options.headers);
            headers = existingHeaders.set('Authorization', `Bearer ${token}`);
        }

        const finalOptions = {
            ...options,
            headers: headers,
            observe: 'body' as const, 
            responseType: 'json' as const
        };

        return this.http.get<Object>(url, finalOptions);
    }

    public getById(url: string, options?: {
        headers?: HttpHeaders | { [header: string]: string | string[] };
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: { includeHeaders?: string[] } | boolean;
    }): Observable<TaskData>{
        const token = this.getToken();

        let headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        if (options?.headers) {
            const existingHeaders = options.headers instanceof HttpHeaders ? options.headers : new HttpHeaders(options.headers);
            headers = existingHeaders.set('Authorization', `Bearer ${token}`);
        }

        const finalOptions = {
            ...options,
            headers: headers,
            observe: 'body' as const, 
            responseType: 'json' as const
        };

        return this.http.get<TaskData>(url, finalOptions);
    }

    public updateTask(url: string, data: TaskData): Observable<TaskData>
    {
        const token = this.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put<TaskData>(url, data, { headers: headers });
    }
    public changeState(id: string, data: string): Observable<any>{
        const token = this.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.get(`https://localhost:44314/api/task/complete?id=${id}&state=${data}`, {headers: headers});
    }

    public createTask(data: any):Observable<any>{
        
        const token = this.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<TaskData>("https://localhost:44314/api/task", data, { headers: headers });
    }
}