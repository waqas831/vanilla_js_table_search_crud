let allPosts = [];
let selectedIndex;
let searchResult = [];

let getPosts = async () => {
  await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      allPosts = posts;
      displayResult();
    });
};
getPosts();

const displayResult = () => {
  if (displayResult.length == 0) {
    document.getElementById("result-table").innerHTML = "";
  }
  for (const index of allPosts.keys()) {
    document.getElementById("result-table").innerHTML += `<tr >
    <td>${allPosts[index].id}</td>
    <td>${allPosts[index].title}</td>
    <td style="text-align:justify;width: 300px">
     ${allPosts[index].body}
    </td>
    <td style="text-align:justify;width: 100px" >
    <button class="delete-btn form-button" onClick="deletePost(${index})">Delete</button></td>
  </tr>`;
  }
};

const search = (searchText) => {
  setTimeout(() => {
    let searchValue = document.getElementById("searchText").value || searchText;
    if (searchValue && searchValue.length > 0) {
      searchResult = allPosts.filter((post) => {
        return post?.title?.toLocaleLowerCase().match(searchValue?.toLocaleLowerCase());
      });
      renderSearchedPosts();
    } else {
      displayResult();
    }
  }, 500);
};

const renderSearchedPosts = () => {
  document.getElementById("result-table").innerHTML = '';
  for (const index of searchResult.keys()) {
    if (index === selectedIndex) {
      document.getElementById("result-table").innerHTML += ` <tr >
      <td>${searchResult[index].id}</td>
      <td><input type="text"  style="width:100%" id="editedTitle" value="${searchResult[index].title}"/></td>
      <td style="text-align:justify;width: 300px">
      <input type="text" style="width:100%" id="editedBody" value="${searchResult[index].body}"/>
      </td>
      <td style="text-align:justify;width: 100px"><button class="save-btn form-button" onClick="savePost(${searchResult[index].id})">Save</button></td>
      </tr>`;
    } else {
      document.getElementById("result-table").innerHTML += `<tr >
      <td>${searchResult[index].id}</td>
      <td>${searchResult[index].title}</td>
      <td style="text-align:justify;width: 300px">
       ${searchResult[index].body}
      </td>
      <td style="text-align:justify;width: 100px" >
      <button class="edit-btn form-button" onClick="editPost(${index})">Edit</button>
      </td>
      </tr>`;
    }
  }
};

const deletePost = (index) => {
  allPosts.splice(index, 1)
  displayResult();
};

const editPost = (index) => {
  selectedIndex = index;
  renderSearchedPosts();
};

const savePost = (id) => {
  allPost = allPosts.filter((post) => {
    if (post.id === id) {
      post.title = document.getElementById("editedTitle").value;
      post.body = document.getElementById("editedBody").value;
      post.isEditMode = false;
    }
  });
  displayResult();
};

const deleteAll = () => {
  allPosts = [];
  displayResult();
};

var search_terms = [
  "apple",
  "apple watch",
  "apple macbook",
  "apple macbook pro",
  "iphone",
  "iphone 12",
];

function autocompleteMatch(input) {
  if (input == "") {
    return [];
  }
  var reg = new RegExp(input);
  return search_terms.filter(function (term) {
    if (term.match(reg)) {
      return term;
    }
  });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = "";
  let list = "";
  let terms = autocompleteMatch(val);
  for (i = 0; i < terms.length; i++) {
    list += "<li>" + terms[i] + "</li>";
  }
  res.innerHTML = "<ul>" + list + "</ul>";
}
