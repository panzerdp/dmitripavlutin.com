---
title: "Easing Data Fetching in React: Lifecycle Methods, Hooks, Suspense"
description: How data fetching in React becomes easier from lifecycle methods, hooks to suspense. 
published: '2019-11-05T13:00Z'
modified: '2019-11-05T13:00Z'
thumbnail: './images/oldman-sea.jpg'
slug: react-fetch-improvement-lifecycle-method-hooks-suspense
tags: ['react', 'lifecycle', 'hook', 'suspense']
recommended: ['7-architectural-attributes-of-a-reliable-react-component', 'use-react-memo-wisely']
type: post
commentsThreadId: react-data-fetching-improvement
---

When I write a React component, I want it to be pure and functional. Pure components are the easiest to work with: from composition to unit testing.  

But when you need to perform on [I/O operation](https://en.wikipedia.org/wiki/Input/output), like an HTTP data fetch, things become more difficult because of the async nature of I/O operations.  

You have to initiate the fetch operation, wait for the response, then handle the response, save the response to component's state, and finally render. 

Fortunately, React evolves in a direction to help you with better tools to handle data fetching.  

This post presents 3 ways to fetch data in React: the old class-based approach that uses lifecycle methods, hooks and suspense. You will see the benefits and drawbacks of each approach, so you could deside which works better for you next time you need to handle data fetching.  


## 1. Data fetching using lifecycle methods

An application *Employees.org* fetches the employees of a company.  

![Employees Application](./images/application.png)

On initial render, first 20 employees are fetched. You can type a query into the input field, and the list gets filtered.  

Let's recall 2 lifecycle methods of the class-based component:

1. `componentDidMount()`: triggers the initial fetching of employees
2. `componentDidUpdate(prevProps)`: trigger fetching of employees when the query changes

The class based component `<EmployeesPage>` implements the fetch logic. This components accepts a prop `query`, and has state `isFetching` and `employees`:

```jsx{10-12,14-18}
import EmployeesList from "./EmployeesList";
import { fetchEmployees } from "./fake-fetch";

class EmployeesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], isFetching: true };
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.fetch();
    }
  }

  fetch() {
    this.setState({ isFetching: true });
    fetchEmployees(this.props.query).then(employees => {
      this.setState({ employees, isFetching: false });
    });
  }

  render() {
    const { isFetching, employees } = this.state;
    if (isFetching) {
      return <div>Fetching employees....</div>;
    }
    return <EmployeesList employees={employees} />;
  }
}
```

The class-based `<EmployeesPage>` has a method `fetch()` that handles fetching. As soon as the data is ready, the component state is updated with fetched `employees`.  

To start fetching the employees as soon as the component is initially rendered, the `fetch()` method is called inside `componentDidMount()` lifecycle method.  

When the user enter a query into the input field, `query` prop of the component is updated. To refetch the employees, inside `componentDidUpdate()` the method `fetch()` is called when `query` prop did change.  

#### Benefits

1. Lifecycle method `componentDidMount()` initiates the fetch on first render
2. Lifecycle method `componentDidUpdate()` refetches data when props change

#### Drawbacks

1. Class-based component requires "ceremony" code, like `super(props)` inside `constructor()`
2. Working with `this` keyword is burdersome
3. Code duplication inside `componentDidMount()` and `componentDidUpdate()`
4. It would be complicated to reuse `fetch()` method inside of other component

## 2. Data fetching using hooks

#### Benefits

#### Drawbacks

## 3. Data fetching using suspense

#### Benefits

#### Drawbacks

## 4. Key takeaways