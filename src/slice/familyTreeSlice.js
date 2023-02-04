import { createSlice } from "@reduxjs/toolkit";

function addChild(data, uniqueId, newChild) {
  if (data?.uniqueId === uniqueId) {
    data?.children?.length > 0
      ? data?.children?.push(newChild)
      : (data.children = [newChild]);

    return data;
  }

  if (!data.children) {
    // console.log("no children");
    return;
  }

  for (let i = 0; i < data.children.length; i++) {
    addChild(data.children[i], uniqueId, newChild);
  }

  //to add child to the last node
  if (data.children.length > 0) {
    addChild(data.children[data.children.length - 1], uniqueId, newChild);
  }
}

//find node by name in tree
function findNodeByName(data, name) {
  if (data?.name?.toLowerCase() == name?.toLowerCase()) {
    return data;
  }

  for (let i = 0; i < data?.children?.length; i++) {
    const node = findNodeByName(data?.children[i], name);
    if (node) {
      return node;
    }
  }

  return null;
}

function findNode(data, id) {
  if (data.uniqueId == id) {
    return data;
  }

  for (let i = 0; i < data?.children?.length; i++) {
    const node = findNode(data?.children[i], id);
    if (node) {
      return node;
    }
  }
  return null;
}

const initialState = {
  data: {
    uniqueId: "1",
    name: "Grand Father",
    spouse: "Grand Mother",
    location: "India",
    birthYear: 1940,
    presentAddress: "Nashik, Maharashtra, India",
    familyPhoto: [
      {
        img: "https://media.istockphoto.com/id/1279995342/photo/grandfather-hugging-grandchildren-on-sofa.jpg?s=612x612&w=0&k=20&c=iLFR_i__ZWpS7aghqMKXow7aaQMdGJdwS65ZvCu99zA=",
        title: "1",
      },
      {
        img: "https://i0.wp.com/evolveservices.org/wp-content/uploads/2020/09/Copy-of-Copy-of-Copy-of-Black-Business-Month-8.png?resize=319%2C227&ssl=1",
        title: "2",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnJSqQIWpfRsmV3BqkdehlPLG4e7WJ2QKuBvOehdI2g&s",
        title: "3",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnJSqQIWpfRsmV3BqkdehlPLG4e7WJ2QKuBvOehdI2g&s",
        title: "4",
      },
    ],
    children: [
      {
        uniqueId: "1.1",
        name: "Son",
        spouse: "Rupali",
        location: "USA",
        birthYear: 1970,
        presentAddress: "1234 Main St, Anytown USA",
        familyPhoto: [
          {
            img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
            title: "son",
          },
          {
            img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
            title: "son",
          },
        ],
        children: [
          {
            uniqueId: "1.1.1",
            name: "Child 1",
            spouse: "Child 1 Spouse",
            location: "USA",
            birthYear: 1960,
            presentAddress: "1234 Main St, Anytown USA",
            familyPhoto: [
              {
                img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
                title: "Grandfather",
              },
              {
                img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
                title: "Grandfather",
              },
            ],
            children: [
              {
                uniqueId: "1.1.1.2",
                name: "Grandchild 1",
                spouse: "Grandchild 1 Spouse",
                location: "USA",
                birthYear: 1980,
                presentAddress: "1234 Main St, Anytown USA",
                familyPhoto: [
                  {
                    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
                    title: "Grandfather",
                  },
                ],
                children: [],
              },
            ],
          },
        ],
      },
      {
        uniqueId: "1.2",
        name: "Daughter",
        spouse: "Ramesh",
        location: "India",
        birthYear: 1980,
        presentAddress: "Nasik, Maharashtra, India",
        familyPhoto: [
          {
            img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
            title: "Grandfather",
          },
          {
            img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
            title: "Grandfather",
          },
        ],
        children: [
          {
            uniqueId: "1.2.1",
            name: "Child 2",
            spouse: "Child 2 Spouse",
            location: "USA",
            birthYear: 1960,
            presentAddress: "1234 Main St, Anytown USA",
            familyPhoto: [
              {
                img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                title: "1",
              },
              {
                img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
                title: "2",
              },
            ],
            children: [],
          },
        ],
      },
    ],
  },

  currentSelected: {},

  searchData: null,

  importedData: null,
};

export const familyTree = createSlice({
  name: "familyTree",
  initialState,
  reducers: {
    searchByName: (state, actions) => {
      if (actions.payload == "" || actions.payload == null) {
        state.searchData = null;
        return;
      } else {
        state.searchData = findNodeByName(state.data, actions.payload);
      }
    },

    getCurrentByNodeId: (state, actions) => {
      state.currentSelected = findNode(state.data, actions.payload);
    },

    addChildren: (state, actions) => {
      function generateUUID() {
        let dt = new Date().getTime();
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
          }
        );
        return uuid;
      }

      let newUUID = generateUUID();

      const payloadData = actions.payload;

      //add unique id to payload
      payloadData.uniqueId = newUUID;

      const id = state.currentSelected.uniqueId;
      addChild(state.data, id, payloadData);
    },
    importJson: (state, actions) => {
      state.data = actions.payload;
    },
    defaultDataForCurrentSelected: (state, actions) => {
      state.currentSelected = state.data;
    },
    getData: (state, actions) => {
      console.log(JSON.parse(JSON.stringify(state.data)), "get data");
    },
  },
});

export const {
  getCurrentByNodeId,
  searchByName,
  addChildren,
  importJson,
  getData,
  defaultDataForCurrentSelected,
} = familyTree.actions;

export default familyTree.reducer;
