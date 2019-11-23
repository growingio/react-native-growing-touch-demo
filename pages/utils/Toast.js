import React from 'react';
import RootSibling from 'react-native-root-siblings';
import ToasContanier from './ToastContainer';

let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy()
    }
}

export default class Toast {

    static showSuccess (message) {
        let opts = {'showSuccess':true,'showInfo':true}
        this.show(message,opts);
    }

    static showFail (message) {
        let opts = {'showFail':true,'showInfo':true}
        this.show(message,opts);
    }

    static showInfo (message) {
        let opts = {'showInfo':true}
        this.show(message,opts);
    }

    static showWarn (message) {
        let opts = {'showWarn':true,'showInfo':true}
        this.show(message,opts);
    }

    static show(message, options) {
        if (rootSibling) {
            rootSibling.destroy()
        }
        rootSibling = new RootSibling(
            <ToasContanier
                {...options}
                message = { message }
                destroy={() => destroy()}
            />);
        return rootSibling;
    }
}