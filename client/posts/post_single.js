Template.singlePost.onRendered(function(){
  $('pre code').each(function(i,block){
    hljs.highlightBlock(block);
  });
  $('img').addClass('responsive-img');
  $('li').addClass('md');
})
