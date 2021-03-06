import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService
    .fetchPosts()
    .subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (e) => {
        console.log(e)
        this.error = e.message;
      }
    }
    );
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content)

    }

    onFetchPosts() {
      // Send Http request
      this.isFetching = true;
      this.postsService
      .fetchPosts()
      .subscribe({
        next: (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        error: (e) => {
          console.log(e)
          this.error = e.message;
        }
      })
    }

    onClearPosts() {
      // Send Http request
      this.postsService.deletePosts().subscribe(
        () => {
          this.loadedPosts = []
        }
      );
    }

}
