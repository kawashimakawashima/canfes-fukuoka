const tasks=[{"startTime":0.5,"duration":2,"column":0,"id":47302,"title":"へのラジコン","value":"ダンボールでハリボテを作ってラジコン化"}]


$(document).ready(function() {
  $("#skeduler-container").skeduler({
    headers: ["七階大教室", "七階小教室", "二階"],
    tasks: tasks,
    cardTemplate: '<div>${title}</div><div>${value}</div>',
    onClick: function (e, t) { console.log(e, t); }
  });
});