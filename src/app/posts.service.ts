import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, pipe, tap } from "rxjs";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient){};

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    this.http
      .post(
        'https://ng-complete-4efe8-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData)
      });
  }

  fetchPosts() {
    // TODO
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('wow', 'whatAboutThis')
    return this.http
    .get<{ [key: string]: Post }>('https://ng-complete-4efe8-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders(
          {
            'Custom-Header': 'Hello world',
            // used for auth.interceptor.service
            'Authorization': 'TrueDude'
          }
        ),
        params: searchParams,
        responseType: 'json'
      })
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push( {...responseData[key], id: key })
          }
        }
      return postsArray;
      })
    );
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-4efe8-default-rtdb.firebaseio.com/posts.json',
    {
      observe: 'events',
      responseType: 'text'
    })
    .pipe(
      tap(event => {
        // console.log(event);
        if (event.type === HttpEventType.Sent){
          // console.log('sent event type')
        }
        if (event.type === HttpEventType.Response) {
          // console.log('received event reponse');
        }
      })
    );
  }

}
