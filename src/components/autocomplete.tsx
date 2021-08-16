import React, { ChangeEventHandler, Component, Fragment } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import './styles.css'
import {suggestion} from './main.component';

interface Props {
  suggestions: Array<any>;
  showSuggestions: boolean;
  userInput: string;
  autoCompleteChangehandler: ChangeEventHandler<HTMLInputElement>;
  autoCompleteClickhandler: ChangeEventHandler<HTMLInputElement>;
}
interface State {
  activeSuggestion: Partial<suggestion>;
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
      userSelection: ""
    };
  }

  onChange = e => {
    this.props.autoCompleteChangehandler(e);
  };

  onClick = e => {
    this.props.autoCompleteClickhandler(e);
    this.setState({
      activeSuggestion: {},
      userSelection: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    // const { activeSuggestion, filteredSuggestions } = this.state;
    // if (e.keyCode === 13 && filteredSuggestions) {
    //   this.setState({
    //     activeSuggestion: {},
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
      });
    }
  };

  render() {
    const {
      onChange, onClick,  onKeyDown,  onBlur,  state: {
        activeSuggestion,
      }
    } = this;
    const {suggestions, showSuggestions, userInput} = this.props

    let suggestionsListComponent;

    if (showSuggestions) {
      if (suggestions && suggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => {
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