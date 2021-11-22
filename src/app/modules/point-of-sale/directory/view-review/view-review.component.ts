import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Scalars } from 'src/app/generated/graphql';
import Maybe from 'graphql/tsutils/Maybe';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  isCollapsed = '';

  dataReview: ReviewModel = {
    userName: 'Sonya Jones',
    reviews: [
      {
        id: '1',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 4.5,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '2',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 2.5,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '3',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 5,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '4',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 3,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '5',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 5,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '6',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 1,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
      {
        id: '7',
        title: 'The best company',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero augue, volutpat at nisi in, tempus placerat diam. Phasellus at nulla eros. Duis lacinia tellus leo, eget semper nunc dignissim',
      rate: 0,
      author: 'Genaro Jose Puc Chi',
      date: '04 Nov 2020'
    },
    ]
  }

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private apollo: Apollo) { }

  ngOnInit() {
    /*const getContries = gql`
    query {
      contries {
        privateKey
        params
      }
    }
    `
    this.apollo
    .watchQuery(
      {
        query: getContries,
        fetchPolicy: "network-only"
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.contries;
    })).subscribe((result) => {
      console.log(result);
    });*/
    let id = "98FBD843-3262-4489-8A2B-17750113DE00";
    let pagination: QueryParamsInputType = {
          "take": 10,
          "skip": 0
      }

    const getCountri = gql`
    query getCountries($params: QueryParamsInputType){
      getCountries(privateKey:"98FBD843-3262-4489-8A2B-17750113DE00", params: $params ){
        answer
        content{
          data{
            id
            name
          }
          totalCount
        }
        error{
          code
          message
        }
      }
    }
    `

    /*this.apollo
    .watchQuery(
      {
        query: getCountri,
        variables: {params: pagination},
        fetchPolicy: "network-only"
      }
    ).valueChanges.pipe(map((result: any) => {

      return result.data.getCountries;
    })).subscribe((result) => {
      console.log(result);
    })*/

  }

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {
        class: 'modal-sm',
        backdrop: 'static', keyboard: false
      });
  }

  closeModal() {
    this.modalService.hide(1)
  }
}

export class ReviewModel {
  userName: string;
  reviews: ReviewsListModel[];
}

export class ReviewsListModel {
  id: string
  title: string;
  comment: string;
  rate: number;
  author: string;
  date: string;
}

export type QueryParamsInputType = {
  skip: Maybe<Scalars['Int']>,
  take: Maybe<Scalars['Int']>,
  };
