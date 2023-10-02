import {Component, ViewChild, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";

interface IsalesTaxArray {
    id: number,
    title: string,
    value: number,
}

interface items {
    id: number,
    name: string,
    items: [
        {
            id: number,
            name: string,
            glCode: number,
            amount: number,
            salesTax: IsalesTaxArray,
        }
    ]
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    totalAmount: number = 0;
    totalTaxes:number = 0;

    itemsTitle: string[] = [
        'Category',
        'Items',
        'GL Code',
        'Amount',
        'Sales Tax',
        'Total',
    ]



    salesTaxArray = [
        {id: 1, title: 'No tax', value: 0},
        {id: 2, title: 'NY', value: 10},
        {id: 3, title: 'Germany', value: 20},
    ]

    localItems:items[] = [
        {
            id: 1,
            name: 'Boris',
            items: [{
                id: 1,
                name: 'Item 1',
                glCode: 0,
                amount: 0,
                salesTax: {
                    id: 0, title: '', value: 0
                },
            }]
        }
    ]


    addCategory(){
        this.localItems.push(
            {
                id: -(new Date().getTime()),
                name: 'Boris',
                items: [{
                    id: -(new Date().getTime()),
                    name: 'Item 1',
                    glCode: 0,
                    amount: 0,
                    salesTax: {
                        id: 0, title: '', value: 0
                    },
                }]
            }
        )
    }

    deleteCategory(id : number){
        const ind = this.localItems.findIndex((item) => item.id === id)
        if(ind !== -1){
            this.localItems.splice(ind,1)
        }
    }

    removeItemFromCategory(categoryId : number, itemId : number) {
        this.localItems.find((item) =>{
            const ind : number = item['items'].findIndex((item) => item.id === itemId)
            if(ind !== -1){
                item['items'].splice(ind,1);
            }
        }
        )
    }

    addItemToCategory(id:number){
        this.localItems.find((item) => {
            if(item.id === id){
                item.items.push(
                    {
                        id: -(new Date().getTime()),
                        name: 'Item 1',
                        glCode: 0,
                        amount: 0,
                        salesTax: {
                            id: 0, title: '', value: 0
                        },
                    }
                )
            }
        })
    }

    getTotalAmount(isAmount:boolean){
        let total = 0;
        this.localItems.forEach((item) => {
            total = item.items.reduce((acc,value) => {
                if(isAmount){
                    return acc + +value.amount
                }else{
                    return acc + +value.salesTax.value
                }
            },total)
        })
        if(isAmount) this.totalAmount = total
        else this.totalTaxes = total
    }

    ngOnInit(){
        this.localItems[0].items[0].salesTax = this.salesTaxArray[0]
    }

    submitForm(myForm: NgForm) {

    }

    protected readonly takeUntil = takeUntil;
}
