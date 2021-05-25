---
title: "How to Cleanup Async Effects in React"
description: "How to handle the asynchornous effects in React that might finish after the component had unmounted."  
published: "2021-05-25T12:00Z"
modified: "2021-05-25T12:00Z"
thumbnail: "./images/cover-2.png"
slug: react-dispose-async-effects
tags: ['react', 'async']
recommended: ['react-useeffect-infinite-loop', 'react-hooks-stale-closures']
type: post
---

The common asynchonous side effects are: performing fetch requests to load data from a remote server, handle timers like `setTimeout()`, debounce or throttle functions, etc.    

Handling of the side-effects in React is a medium complexity task. However, time to time you might find some difficulties that are at the intersection of component lifecycle and the side effect lifecycle.  

One of such difficulty is when a side-effect, which completes after a component unmounts, tries to update the state with the result of the side-effect. That often leads to a known warning by React:

```
Warning: Can't perform a React state update on an unmounted component.
```

In this post, I'll show you when the above warning appears and how to correctly cleanup side-effects in React.  

## 1. State update after unmounting

Let's reproduce the state update after unmounting problem in a simple example.  

A simple application shows information about a local restaurant. The first page displays the list of employees (waiters, kitchen staff), and the second page is a simple about page with textual information.  

```jsx
function Employees() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/employees/list");
      setList(await response.json());
    };
    fetchEmployees();
  }, []);

  if (list === null) {
    return <div>Fetching employees....</div>;
  }

  return (
    <div>
      {list.map(name => <div>{name}</div>)}
    </div>
  );
}

function About() {
  return (
    <div>
      <p>Our restaurant is located ....</p>
    </div>
  );
}
```

The `<App>` component wires toghether `<Employees>` and `<About>` components:

```jsx
function App() {
  const [page, setPage] = useState("employees");

  const showEmployeesPage = () => setPage("employees");
  const showAboutPage = () => setPage("about");

  return (
    <div className="App">
      <h2>My restaurant</h2>
      <a href="#" onClick={showEmployeesPage}>Employees Page</a>
      <a href="#" onClick={showAboutPage}>About Page</a>
      {page === "employees" ? <Employees /> : <About />}
    </div>
  );
}
```

[Try the demo.](https://codesandbox.io/s/side-effect-cleanup-broken-9eofz?file=/src/index.js)

Open the [demo](https://codesandbox.io/s/side-effect-cleanup-broken-9eofz?file=/src/index.js) application. You will see that right away the list of employees is being fetched. The request takes about 3 seconds.  

Now refresh the web page, and before the employees fetching completes, click the `About Page` link. Then open the console, and notice that React has thrown a warning:

![React warning about updating state of unmounted component](./images/warning-2.png)

## 2. Cleaning up effects

### 2.1 Fetch request

### 2.2 Web sockets

### 2.3 Timer functions

### 2.4 Debounce and throttle

## 3. Conclusion