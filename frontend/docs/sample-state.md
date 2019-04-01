# Sample State

```js
{
  currentUser: {
    id: 1,
    username: 'pursuit',
    profile_pic: "image/url/test"
  },

  notes: {
    1: {
      id: 1,
      title: 'test',
      body: 'test',
      notebook_id: 1,
      tag_ids: [1, 2]
    }
  },

  notebooks: {
   1: {
     id: 1,
     title: "test",
     notes: [1]
    }
  },

  tags: {
    1: {
      id: 1,
      name: "test"
    }
  },

  ui: {
    loading: true/false
  }
}
```
