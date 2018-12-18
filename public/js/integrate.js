function changeslide(id) {
  console.log(
    "fdsf",
    id,
    ".gallery input#image" + id + ":checked~.thumbnails .slider",
    "-webkit-transform",
    "translateY(" + (parseInt(id) - 1) + "00%)"
  );

  $("html > head").append(
    $(`<style type = "text/css">
    
    .gallery input#image${id}:checked~.wrap figure {
      -webkit-transform: translateX(-${parseInt(id) - 1}00%);
      transform: translateX(-${parseInt(id) - 1}00%);
    }
    
    .gallery input#image${id}:checked~.wrap figure:not(:nth-of-type(${id})) {
      opacity: 0;
    }
    
    .gallery input#image${id}:checked~.thumbnails .slider {
      -webkit-transform: translateY(${parseInt(id) - 1}00%);
      transform: translateY(${parseInt(id) - 1}00%);
    }
    
    .gallery input#image${id}:checked~.thumbnails .thumb:nth-of-type(${id}) {
      opacity: 1;
      cursor: default;
    }
    
    </style>
    `)
  );
}
