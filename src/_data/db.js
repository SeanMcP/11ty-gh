const fetch = require("node-fetch");

module.exports = async function () {
  if (process.env.NODE_ENV === "development") {
    console.log("👋 Yoo hoo! You're using mock data in development 👍");
    return transform(mockData);
  }
  console.log("⚠️ Hey there! You're using real data from GitHub ⚠️");
  const response = await fetch(
    "https://api.github.com/repos/seanmcp/seanmcp.com/issues"
  );
  const data = await response.json();
  return transform(data);
};

function transform(issues) {
  const output = {
    all: issues,
    pages: {
      byTag: {},
    },
    posts: {
      byTag: {},
    },
  };
  issues.forEach((issue) => {
    const isPage = issue.labels.includes("page");
    const target = isPage ? output.pages : output.posts;
    issue.labels.forEach((label) => {
      if (!target.byTag[label.name]) {
        target.byTag[label.name] = [];
      }
      target.byTag[label.name].push(issue);
    });
  });
  output.pages.tags = Object.keys(output.pages.byTag);
  output.posts.tags = Object.keys(output.posts.byTag);
  return output;
}

const mockData = [
  {
    url: "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13",
    repository_url: "https://api.github.com/repos/SeanMcP/seanmcp.com",
    labels_url:
      "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13/labels{/name}",
    comments_url:
      "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13/comments",
    events_url:
      "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13/events",
    html_url: "https://github.com/SeanMcP/seanmcp.com/issues/13",
    id: 1245576829,
    node_id: "I_kwDOCrc9fM5KPf59",
    number: 13,
    title: "Title",
    user: {
      login: "SeanMcP",
      id: 6360367,
      node_id: "MDQ6VXNlcjYzNjAzNjc=",
      avatar_url: "https://avatars.githubusercontent.com/u/6360367?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/SeanMcP",
      html_url: "https://github.com/SeanMcP",
      followers_url: "https://api.github.com/users/SeanMcP/followers",
      following_url:
        "https://api.github.com/users/SeanMcP/following{/other_user}",
      gists_url: "https://api.github.com/users/SeanMcP/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/SeanMcP/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/SeanMcP/subscriptions",
      organizations_url: "https://api.github.com/users/SeanMcP/orgs",
      repos_url: "https://api.github.com/users/SeanMcP/repos",
      events_url: "https://api.github.com/users/SeanMcP/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/SeanMcP/received_events",
      type: "User",
      site_admin: false,
    },
    labels: [
      {
        id: 1306391751,
        node_id: "MDU6TGFiZWwxMzA2MzkxNzUx",
        url: "https://api.github.com/repos/SeanMcP/seanmcp.com/labels/question",
        name: "question",
        color: "d876e3",
        default: true,
        description: "Further information is requested",
      },
    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: "2022-05-23T18:57:05Z",
    updated_at: "2022-05-23T18:57:19Z",
    closed_at: null,
    author_association: "OWNER",
    active_lock_reason: null,
    body: 'Body\r\n\r\n<img width="249" alt="Screen Shot 2022-05-23 at 2 56 54 PM" src="https://user-images.githubusercontent.com/6360367/169887688-fc7b2f7a-435e-4e1d-80ea-6b8916d3895e.png">\r\n\r\n',
    reactions: {
      url: "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    timeline_url:
      "https://api.github.com/repos/SeanMcP/seanmcp.com/issues/13/timeline",
    performed_via_github_app: null,
    state_reason: null,
  },
];
