import React from 'react';
import {Button, Form,Input} from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
        <Form onSubmit={this.onFormSubmit}>
          <Input
            fluid
            icon="search"
            size="big"
            className="prompt"
            placeholder="Image Search..."
            onChange={e => this.setState({ term: e.target.value })}
            type='text'
          />
        </Form>
    );
  }
}

export default SearchBar;
