$(function() {

	//random ID
	function randomId() {
		const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		let rId = '';
		for (var i = 0; i < 10; i++) {
			rId += chars[Math.floor(Math.random() * chars.length)];
		}
		return rId;
	}

	//CLASS
	function Column(name) {
		const self = this;
		this.id = randomId();
		this.name = name;
		this.$element = createColumn();

		//JQUERY ANCHORS
		function createColumn() {
			//  COMPONENTS OF COLUMN
			const $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column__title').text(self.name),
				$columnCardList = $('<ul>').addClass('column__card-list'),
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x');

			// EVENTS
			$columnDelete.click(function() {
        		self.removeColumn();
			});

			$columnAddCard.click(function(){
				self.addCard(new Card(prompt('Enter the name of the card')));
			})

			$column.append($columnTitle)
				.append($columnAddCard)
				.append($columnDelete)
				.append($columnCardList);
			return $column;
		}
	}
	//METHODS FOR COLUMN
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}


	function Card(description) {
		const self = this;
		this.id = randomId();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			//COMPONENTS OF CARD
			const $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card__description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete').text('x');
			//EVENTS
			$cardDelete.click(function(){
				self.removeCard();
			})

			//CONSTRUCTION
			$card.append($cardDescription)			
				.append($cardDelete);
			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	const board = {
		name: "Kanban Board",
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}

	function initSortable() {
	    $('.column__card-list').sortable({
	      connectWith: '.column__card-list',
	      placeholder: 'card-placeholder'
	    }).disableSelection();
  	}
  	$('.create-column')
  		.click(function(){
			const name = prompt('Enter a column name'),
			column = new Column(name);
		    board.addColumn(column);
 		});

 	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
})