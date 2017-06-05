// @flow

import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import { expectComponentToMatch } from './utils';
import { Pagination } from '../src/';

describe('paginations', () => {
  describe('Pagination', () => {
    it('should pass props', () => {
      expectComponentToMatch(<Pagination name="foo" />, <div name="foo" />);
    });

    it('should render a custom component', () => {
      expectComponentToMatch(<Pagination component="span" />, <span />);
    });

    it('should render prev indicator', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          prevIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled={false} pageIndex={4} pageNumber={5} />
        </div>,
      );
    });

    it('should render next indicator', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          nextIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled={false} pageIndex={6} pageNumber={7} />
        </div>,
      );
    });

    it('should render first indicator', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          firstIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled={false} pageIndex={0} pageNumber={1} />
        </div>,
      );
    });

    it('should render last indicator', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          lastIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled={false} pageIndex={9} pageNumber={10} />
        </div>,
      );
    });

    it('should call onPageChange with the correct page', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          indicators={1}
          onPageChange={page => expect(page).toEqual(5)}
          pageIndicator={props => (
            <button onClick={props.onPageChange} {...props} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should call onPageChange with the prev page', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          onPageChange={page => expect(page).toEqual(4)}
          prevIndicator={props => (
            <button onClick={props.onPageChange} {...props} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should call onPageChange with the next page', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          onPageChange={page => expect(page).toEqual(6)}
          nextIndicator={props => (
            <button onClick={props.onPageChange} {...props} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should call onPageChange with the first page', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          onPageChange={page => expect(page).toEqual(0)}
          firstIndicator={props => (
            <button onClick={props.onPageChange} {...props} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should call onPageChange with the last page', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={5}
          pageNumber={6}
          onPageChange={page => expect(page).toEqual(9)}
          lastIndicator={props => (
            <button onClick={props.onPageChange} {...props} />
          )}
        />,
      );
      const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        rendered,
        'button',
      );
      ReactTestUtils.Simulate.click(button);
    });

    it('should disable the prev indicator while in the first page', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={0}
          pageNumber={1}
          prevIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled />
        </div>,
      );
    });

    it('should disable the next indicator while in the last page', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={99}
          pageNumber={100}
          nextIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled />
        </div>,
      );
    });

    it('should disable the first indicator while in the first page', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={0}
          pageNumber={1}
          firstIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled />
        </div>,
      );
    });

    it('should disable the last indicator while in the last page', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={9}
          pageNumber={10}
          lastIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled />
        </div>,
      );
    });

    it('should render page indicators at the beginning', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={1}
          pageNumber={2}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={0} pageNumber={1} />
          <div pageIndex={1} pageNumber={2} />
          <div pageIndex={2} pageNumber={3} />
          <div pageIndex={3} pageNumber={4} />
          <div pageIndex={4} pageNumber={5} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={0}
          pageNumber={1}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={0} pageNumber={1} />
          <div pageIndex={1} pageNumber={2} />
          <div pageIndex={2} pageNumber={3} />
          <div pageIndex={3} pageNumber={4} />
          <div pageIndex={4} pageNumber={5} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={2}
          pageNumber={3}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={0} pageNumber={1} />
          <div pageIndex={1} pageNumber={2} />
          <div pageIndex={2} pageNumber={3} />
          <div pageIndex={3} pageNumber={4} />
          <div pageIndex={4} pageNumber={5} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={3}
          pageNumber={4}
          indicators={6}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={0} pageNumber={1} />
          <div pageIndex={1} pageNumber={2} />
          <div pageIndex={2} pageNumber={3} />
          <div pageIndex={3} pageNumber={4} />
          <div pageIndex={4} pageNumber={5} />
          <div pageIndex={5} pageNumber={6} />
        </div>,
      );
    });

    it('should render page indicators in the middle', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={3}
          pageNumber={4}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={1} pageNumber={2} />
          <div pageIndex={2} pageNumber={3} />
          <div pageIndex={3} pageNumber={4} />
          <div pageIndex={4} pageNumber={5} />
          <div pageIndex={5} pageNumber={6} />
        </div>,
      );
    });

    it('should render page indicators at the end', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={9}
          pageNumber={10}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={5} pageNumber={6} />
          <div pageIndex={6} pageNumber={7} />
          <div pageIndex={7} pageNumber={8} />
          <div pageIndex={8} pageNumber={9} />
          <div pageIndex={9} pageNumber={10} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={8}
          pageNumber={9}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={5} pageNumber={6} />
          <div pageIndex={6} pageNumber={7} />
          <div pageIndex={7} pageNumber={8} />
          <div pageIndex={8} pageNumber={9} />
          <div pageIndex={9} pageNumber={10} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={7}
          pageNumber={8}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={5} pageNumber={6} />
          <div pageIndex={6} pageNumber={7} />
          <div pageIndex={7} pageNumber={8} />
          <div pageIndex={8} pageNumber={9} />
          <div pageIndex={9} pageNumber={10} />
        </div>,
      );

      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={7}
          pageNumber={8}
          indicators={6}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div pageIndex={4} pageNumber={5} />
          <div pageIndex={5} pageNumber={6} />
          <div pageIndex={6} pageNumber={7} />
          <div pageIndex={7} pageNumber={8} />
          <div pageIndex={8} pageNumber={9} />
          <div pageIndex={9} pageNumber={10} />
        </div>,
      );
    });

    it('should disable the current page indicator', () => {
      expectComponentToMatch(
        <Pagination
          items={100}
          pages={10}
          pageSize={10}
          pageIndex={1}
          pageNumber={2}
          indicators={5}
          pageIndicator={props => <div {...props} />}
        />,
        <div>
          <div disabled={false} pageIndex={0} pageNumber={1} />
          <div disabled pageIndex={1} pageNumber={2} />
          <div disabled={false} pageIndex={2} pageNumber={3} />
          <div disabled={false} pageIndex={3} pageNumber={4} />
          <div disabled={false} pageIndex={4} pageNumber={5} />
        </div>,
      );
    });
  });
});
