// Select dom element
const all_match = document.querySelector(".all-matches");
const addMatch = document.querySelector(".lws-addMatch");
const reset = document.querySelector(".lws-reset");

// initial state
const initialState = [
    {
        id: 0,
        total: 0
    }
];

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "add_match";
const DELETE = "delete";
const RESET = "reset";



// create reducer function
function scoreBoardReducer(state=initialState,action){
    if(action.type === INCREMENT){
       return state.map(item => {
            if(item.id === action.index){
                
                return {
                    ...item,
                    total: item.total + Number(action.payload),
                }
            }else{
                return {...item}
            }
       })
    } else if(action.type === DECREMENT){
        return state.map(item => {
            if(item.id === action.index){
                return {
                    ...item,
                    total: (item.total - Number(action.payload)) < 0? 0: item.total - Number(action.payload) ,
                }
            }else{
                return {...item}
            }
       })
    } else if(action.type === ADD_MATCH){
        return [...state,{
            id: state.length,
            total: 0,
        }];
    } else if(action.type === RESET){
        return state.map(item => {
            return {
                ...item,
                total: 0
            }
        })
    } else if(action.type === DELETE){
        return state.filter(item => item.id != action.index);
    } else {
        return state;
    }
}


// create store
const store = Redux.createStore(scoreBoardReducer);

const render = () => {
    const state = store.getState();
    all_match.innerHTML = /*html*/` 
        
        ${state.map(item => {
            return `
            <div class="match">
                <div class="wrapper">
                    <button class="lws-delete" onclick="deleteHandler(event,${item.id})">
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match ${item.id + 1}</h3>
                </div>
                <div class="inc-dec">
                    <form class="incrementForm">
                        <h4>Increment</h4>
                        <input
                            type="number"
                            name="increment"
                            class="lws-increment"
                            onkeypress="incrementHandler(event,${item.id})"
                        />
                    </form>
                    <form class="decrementForm">
                        <h4>Decrement</h4>
                        <input
                            type="number"
                            name="decrement"
                            class="lws-decrement"
                            onkeypress="decrementHandler(event,${item.id})"
                        />
                    </form>
                </div>
                <div class="numbers">
                    <h2 class="lws-singleResult">${item.total}</h2>
                </div>
            </div>`
        }).join(" ")}               
        `;
};

// update UI
render();
store.subscribe(render);

// other functions
incrementHandler = (e,id) => {
    if(e.key === 'Enter'){
        store.dispatch({
            type: "increment",
            index: id,
            payload: e.target.value,
        });
        e.preventDefault();
    }
}

decrementHandler = (e,id) => {
    if(e.key === 'Enter'){
        store.dispatch({
            type: "decrement",
            index: id,
            payload: e.target.value
        });
        e.preventDefault();
    }
}

addMatch.addEventListener("click",(e)=>{
    store.dispatch({
        type: "add_match"
    });
    e.preventDefault();
})

deleteHandler = (e,id) => {
    store.dispatch({
        type: "delete",
        index: id,
    });
    e.preventDefault();
}

reset.addEventListener("click",(e)=>{
    store.dispatch({
        type: "reset"
    });
    e.preventDefault();
})