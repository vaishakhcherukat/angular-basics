import { Component, OnInit,ViewChild ,Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { Params , ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, expand  ,flyInOut} from '../animations/app.animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    expand(),
    flyInOut()
  ]
})
export class DishdetailComponent implements OnInit {
  
  commentForm: FormGroup;
  comment: Comment;
  visibility = 'shown';

  @ViewChild('cform') commentFormDirective;

  dishes : Dish;
  dishIds: string[];
  prev: string;
  next: string;
  viewStatus:string;
  errMess: string;
  dishcopy: Dish;
  
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
     
    },
  };

  constructor(
      private dishService : DishService,
      private route :ActivatedRoute,
      private location :Location,
      private fb: FormBuilder,
      @Inject( 'BaseURL')  private BaseURL
  ) { 
    this.createForm();
  }




   ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden';
     return  this.dishService.getDish(params['id'])
  
  }))
    .subscribe(dishes => { this.dishes = dishes;
      this.dishcopy = dishes;
       this.setPrevNext(dishes.id);
       this.visibility = 'shown'; } ,
    errmess => this.errMess = <any>errmess)
 ;

  }

  createForm() {
  this.commentForm=  this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: 5,
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  console.log(this.commentForm.status);
  }
  onSubmit() {
   
       this.comment = this.commentForm.value;
       var d = new Date();
       var n = d.toISOString();
       this.comment.date = n.toString();

    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dishes = dish; this.dishcopy = dish;
      },
      errmess => { this.dishes = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      author: '',
      rating: 5,
      message: ''
    });


  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
goBack() :void {
    this.location.back();
}

onValueChanged(data?: any) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
 
 } }
}
