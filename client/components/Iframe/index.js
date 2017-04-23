import React, { Component } from 'react'

/**
 * React component which renders the given content into an iframe.
 * Additionally an array of stylesheet urls can be passed. They will 
 * also be loaded into the iframe.
 */
class ExampleContainer extends React.Component {
    
    static propTypes = {
        content: React.PropTypes.string.isRequired,
        stylesheets: React.PropTypes.arrayOf(React.PropTypes.string),
    };

    /**
     * Called after mounting the component. Triggers initial update of
     * the iframe
     */
    componentDidMount() {
        this._updateIframe();
    }

    /**
     * Called each time the props changes. Triggers an update of the iframe to
     * pass the new content
     */
    componentDidUpdate() {
        this._updateIframe();
    }

    /**
     * Updates the iframes content and inserts stylesheets.
     * TODO: Currently stylesheets are just added for proof of concept. Implement
     * and algorithm which updates the stylesheets properly.
     */
    _updateIframe() {
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const head = document.getElementsByTagName('head')[0];
        document.body.innerHTML = this.props.content;
        
        this.props.stylesheets.forEach(url => {
            const ref = document.createElement('link');
            ref.rel = 'stylesheet';
            ref.type = 'text/css';
            ref.href = url;
            head.appendChild(ref);
        });
    }

    /**
     * This component renders just and iframe
     */
    render() {
        return <iframe style={{height: 450, width: 600}} ref="iframe"/>
    }
}

/**
 * Exmaple App to demonstrate the ExampleContainer component
 */
class Iframe extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            content: `<Iframe
                height='450'
                width='600'
                frameborder='0' style='border:0'
                src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAsTRMK5fSazQuN7qtvsarwkl6-QzvNxs4&q=` + props.longitude + `,` + props.latitude + `'
                allowfullscreen />`,
            styles: [
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
            ]
        }
    }

    render() {
        const {content, counter, styles} = this.state;
        
        return (
            <div>
                <ExampleContainer content={content + counter} stylesheets={styles} />
            </div>
        );
    }
}

export default Iframe
