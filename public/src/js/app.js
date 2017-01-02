var postId = 0;

$('.post').find('.interaction').find('.edit').on('click', function(event){
	event.preventDefault();

	var postBodyElement = event.target.parentNode.parentNode.childNodes[1];
	var postBody = postBodyElement.textContent;
	var postId = event.target.parentNode.parentNode.dateset['postid'];
	console.log(postBody);
	$('#post-body').val(postBody);
	$('#edit-modal').modal();
});

$('modal-save').on('click', function(){
	$.ajax({
		method: 'POST',
		url: urlEdit,
		data: { body: ${'#post-body'}.val(), postId: postId, _token: token }
	})
		.done(function(msg){
			$(postBodyElement).text(msg['new_body']);
			$('#edi-modal').modal('hide');
		});
});

$('.like').on('click', function(event) {

    event.preventDefault();

    var isLike = event.target.previousElementSibling == null;

    postId = event.target.parentNode.parentNode.dataset['postid'];

    $.ajax({
        method: 'POST',
        url: urlLike,
        data: {isLike: isLike, postId: postId, _token: token}
    })
    
    .done(function() {
        event.target.innerText = isLike ? event.target.innerText == 'Like' ? 'You like this post' : 'Like' : event.target.innerText == 'Dislike' ? 'You don\'t like this post' : 'Dislike';
        if (isLike) {
            event.target.nextElementSibling.innerText = 'Dislike';
        } else {
            event.target.previousElementSibling.innerText = 'Like';
        }
    });

});