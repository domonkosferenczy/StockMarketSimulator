const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_CAPITAL":
      return {
        ...state,
        user: {
          ...state.user,
          capitalAvailable: action.payload,
        },
      };
    case "INCR_CAPITAL":
      return {
        ...state,
        user: {
          ...state.user,
          capitalAvailable:
            parseFloat([state.user.capitalAvailable]) +
            parseFloat(action.payload),
        },
      };
    case "SET_VALUE_OF_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          valueOfStocks: action.payload,
        },
      };
    case "SET_PRE_VALUE_OF_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          preValueOfStocks: action.payload,
        },
      };

    // FILTER
    case "SET_FILTER_INPUT":
      return {
        ...state,
        filter: {
          ...state.filter,
          search: action.payload,
        },
      };
    case "SET_FILTER_TYPE":
      return {
        ...state,
        filter: {
          ...state.filter,
          type: action.payload,
        },
      };
    case "SET_CHOSEN":
      return {
        ...state,
        animation: {
          ...state.animation,
          chosen: action.payload,
        },
      };
    case "ADD_OWNED_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          ownedStocks: {
            ...state.user.ownedStocks,
            [action.payload.ticker]: {
              numberOfStocks: action.payload.number,
              profit: 0,
            },
          },
        },
      };
    case "INCR_OWNED_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          ownedStocks: {
            ...state.user.ownedStocks,
            [action.payload.ticker]: {
              ...state.user.ownedStocks[action.payload.ticker],
              numberOfStocks:
                parseInt(
                  state.user.ownedStocks[action.payload.ticker].numberOfStocks
                ) + parseInt(action.payload.number),
            },
          },
        },
      };

    // Animation
    case "INCR_SPEED":
      return {
        ...state,
        animation: {
          ...state.animation,
          speed: state.animation.speed + action.payload,
        },
      };
    case "SET_PAUSED":
      return {
        ...state,
        animation: {
          ...state.animation,
          paused: action.payload,
        },
      };
    case "INCR_ZOOM":
      return {
        ...state,
        animation: {
          ...state.animation,
          zoom: state.animation.zoom + action.payload,
        },
      };
    case "SET_CURRENT_DATE":
      return {
        ...state,
        animation: {
          ...state.animation,
          currentDate: action.payload,
        },
      };
    case "SET_SHOWN_FROM":
      return {
        ...state,
        animation: {
          ...state.animation,
          shownFrom: action.payload,
        },
      };
    case "GRAPH_MOVE":
      return {
        ...state,
        animation: {
          ...state.animation,
          currentDate: action.payload.currentDate,
          shownFrom: action.payload.shownFromData,
        },
      };

    case "CHANGE_SHOW":
      return {
        ...state,
        animation: {
          ...state.animation,
          show: [action.payload],
        },
      };

    case "CHANGE_TIMESTAMP":
      return {
        ...state,
        animation: {
          ...state.animation,
          timestamp: action.payload,
        },
      };

    // Message
    case "ADD_MESSAGE":
      let newarray = state.message.messages;
      if (!newarray.includes(action.payload)) newarray.push(action.payload);
      return {
        ...state,
        message: {
          ...state.message,
          lastId: state.message.lastId + 1,
          messages: newarray,
        },
      };
    case "REMOVE_MESSAGE":
      let newarray2 = state.message.messages;
      let newarray3 = [];
      newarray3 = newarray2.filter((message) => message.id !== action.payload);
      return {
        ...state,
        message: {
          ...state.message,
          messages: newarray3,
        },
      };

    // History
    case "ADD_HISTORY_CAPITAL":
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            capitalAvailable: {
              ...state.user.history.capitalAvailable,
              [action.payload.date]: action.payload.value,
            },
          },
        },
      };

    case "ADD_HISTORY_VALUE_OF_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            valueOfStocks: {
              ...state.user.history.valueOfStocks,
              [action.payload.date]: action.payload.value,
            },
          },
        },
      };

    case "SET_HISTORY_VALUE_OF_STOCKS":
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            valueOfStocks: action.payload,
          },
        },
      };
    case "SET_HISTORY_CAPITAL_AVAILABLE":
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            capitalAvailable: action.payload,
          },
        },
      };

    case "ADD_HISTORY_ACTION":
      let payload = state.user.history.actions;
      payload.push(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            actions: payload,
          },
        },
      };
    case "CLEAR_HISTORY":
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            valueOfStocks: {},
            capitalAvailable: {},
            actions: [],
          },
        },
      };

    case "SET_STATE":
      const shown = state.animation.shown;
      shown[2] = action.payload.secondChosen;
      return {
        ...state,
        user: {
          ...state.user,
          history: {
            ...state.user.history,
            capitalAvailable: { [action.payload.firstChosen]: 0 },
            valueOfStocks: { [action.payload.firstChosen]: 0 },
          },
        },
        animation: {
          ...state.animation,
          chosen: action.payload.firstChosen,
          shown: shown,
          currentDate: action.payload.firstDate,
          shownFrom: action.payload.firstDate,
        },
        loaded: true,
      };

    // Reducer for the Data.js
    case "SET_DATA":
      return action.payload;

    default:
      return state;
  }
};

export default Reducer;
