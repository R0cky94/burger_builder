import React, {Component} from 'react';
import Auxx from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BulidControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    //   constructor(props){
    //     super(props);
    //   this.state={}


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseAble: false

    };

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseAble: sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const upDatedCount = oldCount + 1;
        const upDatedIngredients = {
            ...this.state.ingredients
        };
        upDatedIngredients[type] = upDatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newprice = oldPrice + priceAddition;
        this.setState({totalPrice: newprice, ingredients: upDatedIngredients});
        this.updatePurchaseState(upDatedIngredients);
    };


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const upDatedCount = oldCount - 1;
        const upDatedIngredients = {
            ...this.state.ingredients
        };
        upDatedIngredients[type] = upDatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newprice = oldPrice - priceDeduction;
        this.setState({totalPrice: newprice, ingredients: upDatedIngredients});
        this.updatePurchaseState(upDatedIngredients);

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        return (
            <Auxx>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>

                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledInfo}
                               purchaseAble={this.state.purchaseAble}
                               price={this.state.totalPrice}

                />

            </Auxx>
        );
    }
}

export default BurgerBuilder;