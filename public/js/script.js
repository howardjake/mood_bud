$("#delete").click(function() {
    var sure = confirm("Are you sure? This will permanently delete this board. You will not get it back.")
    if (sure) {
        this.parentNode.submit();
    }
});