import expect from 'expect';
import ReactTestRenderer from 'react-test-renderer';

// eslint-disable-next-line
export const expectComponentToMatch = (component1, component2) => {
  const rendered = ReactTestRenderer.create(component1).toJSON();
  const expected = ReactTestRenderer.create(component2).toJSON();
  expect(rendered).toMatch(expected);
};
