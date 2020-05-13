import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({error, touched}){
        if(touched && error){
        return(
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
            );
        }
    }

    renderInput = ({input, label, meta }) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>  
        ); 
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render(){
        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Digite o título"/>
                <Field name="description" component={this.renderInput} label="Digite uma descrição"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) =>{
    const error = {};
    if(!formValues.title){
        error.title = "Você deve preencher o título";
    }
    if(!formValues.description){
        error.description = "Você deve preencher a descrição";
    }

    return error;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);

