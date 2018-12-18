$(".desktopsearch")
  .autocomplete({
    delay: 100,
    minLength: 1,
    source: function(request, response) {
      $.ajax({
        type: "GET",
        dataType: "JSON",
        url: APIURL + "/search?q=" + request.term,
        contentType: "application/json",
        success: function(data) {
          response(
            $.map(data.results.response, function(item) {
              // if (item.type != "brand") {
              return {
                label: item.name,
                value: item.name,
                desc: item.type,
                id: item.id,
                main_id: item.main_cat_id
              };
              // }
            })
          );
        },
        error: function(data) {}
      });
    },
    select: function(event, ui) {
      var base_url = window.location.origin;
      d = ui.item;
      switch (d.desc) {
        case "product":
          window.location.replace(
            base_url +
              "/product-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "brand":
          window.location.replace(
            base_url + "/product-listing/" + "#!?brand=" + d.id
          );
          break;
        case "bundle":
          window.location.replace(
            base_url +
              "/bundle-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "category":
          window.location.replace(
            base_url +
              "/product-listing/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "sub-category":
          window.location.replace(
            base_url +
              "/product-listing/" +
              d.main_id +
              "/" +
              d.value.replace(/\s+/g, "-") +
              "#!?sub_cat=" +
              d.id
          );
          break;
      }
    }
  })
  .autocomplete("instance")._renderItem = function(ul, item) {
  return $("<li>")
    .append(
      "<div class='cusui'><b>" +
        item.label +
        "</b><br><small> - " +
        item.desc +
        "</small></div>"
    )
    .appendTo(ul);
};
$("#searchLblm")
  .autocomplete({
    delay: 100,
    minLength: 1,
    source: function(request, response) {
      $.ajax({
        type: "GET",
        dataType: "JSON",
        url: APIURL + "/search?q=" + request.term,
        contentType: "application/json",
        success: function(data) {
          response(
            $.map(data.results.response, function(item) {
              // if (item.type != "brand") {
              return {
                label: item.name,
                value: item.name,
                desc: item.type,
                id: item.id,
                main_id: item.main_cat_id
              };
              // }
            })
          );
        },
        error: function(data) {}
      });
    },
    select: function(event, ui) {
      var base_url = window.location.origin;
      d = ui.item;
      switch (d.desc) {
        case "product":
          window.location.replace(
            base_url +
              "/product-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "brand":
          window.location.replace(
            base_url + "/product-listing/" + "#!?brand=" + d.id
          );
          break;
        case "bundle":
          window.location.replace(
            base_url +
              "/bundle-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "category":
          window.location.replace(
            base_url +
              "/product-listing/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
          );
          break;
        case "sub-category":
          window.location.replace(
            base_url +
              "/product-listing/" +
              d.main_id +
              "/" +
              d.value.replace(/\s+/g, "-") +
              "#!?sub_cat=" +
              d.id
          );
          break;
      }
    }
  })
  .autocomplete("instance")._renderItem = function(ul, item) {
  return $("<li>")
    .append(
      "<div class='cusui'><b>" +
        item.label +
        "</b><br><small> - " +
        item.desc +
        "</small></div>"
    )
    .appendTo(ul);
};
