const React = require('react');
const HomePageModule = require('./src/app/page');
const HomePage = HomePageModule.default;

// Mock the components it imports
jest = { mock: () => {} }; // in case

function traverse(node) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach(traverse);
    return;
  }
  if (node.props) {
    if (node.props.children) {
      traverse(node.props.children);
    }
    // If it's a ProductCard, let's see its product prop
    if (node.type && node.type.name === 'ProductCard') {
      if (!node.props.product) {
        console.log('Found ProductCard with undefined product prop!', node);
      }
    }
  }
}

try {
  // Mock ProductCard if needed, but since it's imported, let's see what HomePage() returns
  // HomePage is a standard JS function since it's a React component
  const element = HomePage();
  traverse(element);
  console.log('React tree traversed successfully. No issues found in HomePage elements directly.');
} catch (e) {
  console.error('Error caught during HomePage execution or traversal:', e);
}
