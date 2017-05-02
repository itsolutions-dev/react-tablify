import { JSDOM } from 'jsdom';

global.dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = global.dom.window.document;
global.window = global.dom.window;
global.navigator = global.dom.window.navigator;
