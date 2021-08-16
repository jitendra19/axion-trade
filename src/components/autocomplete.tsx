import React, { Component, Fragment } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import './styles.css'

interface Props {
  suggestions: Array<any>;
}
interface suggestion {
  _id: string;
  symbol: String;
  name: String;
  exch: String;
  type: String;
  exchDisp: String;
  typeDisp: String;
};
interface State {
  activeSuggestion: Partial<suggestion>;
  filteredSuggestions: Array<suggestion>;
  showSuggestions: boolean;
  userInput: string;
  userSelection?: string;
}
class Autocomplete extends Component<Props, State> {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: {},
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      userSelection: ""
    };
  }

  componentDidMount() {
    
  }

  onChange = e => {
    const userInput = e.currentTarget.value;
    axios.get(`/api/stocks?input=${userInput}`)
    .then((res)=>{
      const filteredSuggestions = res.data;
      this.setState({
        activeSuggestion: {},
        filteredSuggestions,
        showSuggestions: true,
        userInput: userInput
      });
    }).catch(e => {
      console.log(e);
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: {},
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      userSelection: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    // const { activeSuggestion, filteredSuggestions } = this.state;
    // if (e.keyCode === 13 && filteredSuggestions) {
    //   this.setState({
    //     activeSuggestion: {},
    //     showSuggestions: false,
    //     userInput: filteredSuggestions[activeSuggestion],
    //     userSelection: filteredSuggestions[activeSuggestion]
    //   });
    // }
    // else if (e.keyCode === 38) {
    //   if (activeSuggestion === 0) {
    //     return;
    //   }

    //   this.setState({ activeSuggestion: activeSuggestion - 1 });
    // }
    // else if (e.keyCode === 40) {
    //   if (filteredSuggestions && activeSuggestion - 1 === filteredSuggestions.length) {
    //     return;
    //   }
    //   this.setState({ activeSuggestion: activeSuggestion + 1 });
    // }
  };

  onBlur = (e)=> {
    if (this.state.userSelection === "") {
      this.setState({
        activeSuggestion: {},
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: '',

      });
    }
  };

  render() {
    const {
      onChange, onClick,  onKeyDown,  onBlur,  state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions && filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} 
                  key={suggestion._id + suggestion.symbol} 
                  onClick={onClick}>
                  {suggestion.name} ({suggestion.symbol} )
                </li>
              );
            })}
          </ul>
        );
      } 
    }

    return <Fragment>
        <input className="input" placeholder="Search here..."
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onBlur={onBlur}
        />
        {suggestionsListComponent}
      </Fragment>;
  }
}
export default Autocomplete;