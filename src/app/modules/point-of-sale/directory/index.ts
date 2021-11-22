import { ViewDirectoryComponent } from './view-directory/view-directory.component';
import { DirectoryComponent } from './directory.component';
import { UpdateDirectoryComponent } from './update-directory/update-directory.component';
import { ViewReviewComponent } from './view-review/view-review.component';
import { StarRaitingComponent } from './star-raiting/star-raiting.component';
import { StarItemComponent } from './star-raiting/star-Item.component';

export const directoryComponents = [
  ViewDirectoryComponent,
  DirectoryComponent,
  UpdateDirectoryComponent,
  ViewReviewComponent,
  StarRaitingComponent,
  StarItemComponent
];

/*Se exporta por cada componente deseado*/
export * from './view-directory/view-directory.component';
export * from './directory.component';
export * from './update-directory/update-directory.component';
export * from './view-review/view-review.component';
export * from './star-raiting/star-raiting.component';
export * from './star-raiting/star-Item.component';
