pragma solidity ^0.5.0;

contract SocialNetwork {
	struct Post {
		uint id;
		string content;
		uint tipAmount;
		address author;
	}

	event PostCreated (
		uint id,
		string content,
		uint tipAmount,
		address author
	);

	string public name;
	uint public postCount = 0;
	mapping (uint => Post) public posts;			

	constructor() public {
	    name = "Duara Social Site";
	}

	function createPost (string memory _content) public {

		// require valid content
		require (bytes(_content).length > 4);		

		// increment the post count
		postCount ++;

		// create the post
		posts[postCount] = Post(postCount, _content, 0, msg.sender);

		// trigger an event
		emit PostCreated(postCount, _content, 0, msg.sender);
	}
	
	function tipPost(uint _id) public {

		// fetch the post
		Post memory _post = posts[_id];

		// fetch the post's author
		address _author = _post.author

		// pay the author by sending them ether
		address(_author).transfer(msg.value)

		// increment the tip amount
		_post.tipAmount += msg.value;

		// update the tipped post
		posts[_id] = _post;
		
		// trigger an event
	}

}
