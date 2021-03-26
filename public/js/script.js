
$(".delete").click(function() {
    var sure = confirm("Are you sure you want to delete this?")
    if (sure) {
        this.parentNode.submit();
    }
});

var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})

var input = $('#new-link')
console.log(input.val());

$("#add-link").click(function() {
  if(input.val() === '') {
    this.parentNode.submit();
  } else {
    alert("Sorry, you must enter a link first")
  }
});