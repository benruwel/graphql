import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_POST = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`;

const GET_POSTS_OF_AUTHOR = gql`
  query GetPostsOfAuthor($authorId: Int!) {
    postsOf(authorId: $authorId) {
      id
      title
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'learning-graphql';
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: GET_POST,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.apollo.watchQuery({
      query: GET_POSTS_OF_AUTHOR,
      variables: {
        authorId: 12,
      },
    });
  }
}
