// 대유평 축제 프로젝트.

var strImage = new Array(18);	//오리지널 이미지파일명 배열지정
strImage[0] = "/card0.gif";		strImage[1] = "/card1.gif";		strImage[2] = "/card2.gif";
strImage[3] = "/card3.gif";		strImage[4] = "/card4.gif";		strImage[5] = "/card5.gif";
strImage[6] = "/card6.gif";		strImage[7] = "/card7.gif";		strImage[8] = "/card8.gif";
strImage[9] = "/card0.gif";		strImage[10] = "/card1.gif";	strImage[11] = "/card2.gif";
strImage[12] = "/card3.gif";	strImage[13] = "/card4.gif";	strImage[14] = "/card5.gif";
strImage[15] = "/card6.gif";	strImage[16] = "/card7.gif";	strImage[17] = "/card8.gif";

var sImage1, sImage2;
var blank = "/blank.gif";
var buffer;

var count = 0;	// 몇번 찍었는지 알려줌.
var gameCount = 9; // 카드를 몇개 맞추었는지 알려줌.
var nScore = 0;	// 점수
var nLife = 3; // 생명
var nTime = 10;
var delayTime = 3;

var timerID;
var delayID;

function getPath( URL )
{
	return URL.substring(0, URL.lastIndexOf('/'));
}

var currentPath = getPath(self.location + "");

//난수 발생 함수
function rand(max)
{
	return Math.round((max - 1) * Math.random());
}

//랜덤하게 배치.. (중복 문제 있음..)
function Randomize()
{
	var r, buffer;
	for ( var i = 0; i < 18; i++ )
	{
		r = rand(18);
		buffer = strImage[r];
		strImage[r] = strImage[i];
		strImage[i] = buffer;
	}

	gameTimer();
}

function gameTimer()
{
	if( nTime > 0 )
		document.myForm.time.value = --nTime;
	else
	{
		if ( nLife == 0 )	//라이프는 시간이 다될때 감소하도록 한다.
			GameOver( false );
		else
		{
			document.myForm.life.value = --nLife;
			nTime = 10;
		}
	}

	timerID = setTimeout( "gameTimer();", 1000 );
	return;
}

function delay()
{
	if (delayTime > 0)
		delayTime--;
	else
	{
		delayTime = 3;
		clearTimeout( delayID );
	}
	
	delayID = setTimeout( "delay();", 1000 );
}

//이미지 클릭할 때 실행
function clicked( index )
{
	if( document.images[index].src == currentPath + blank )
	{
		document.images[index].src = currentPath + strImage[index];
		if ( ++count == 1 )
		{
			buffer = index;
			sImage1 = strImage[index];
		}
	
		else if ( count == 2 )
		{
			count = 0;
			sImage2 = strImage[index];
			if ( sImage1 == sImage2 )
			{
				nTime = 10;
				nScore += 500;	//맞추는 개수당 500점..
				document.myForm.score.value = nScore;
				if( --gameCount == 0 )
					GameOver( true );
			}
			else
			{
				delay();
				document.images[index].src = currentPath + blank;
				document.images[buffer].src = currentPath + blank;
//				document.myForm.life.value = --nLife;
//				if ( nLife == 0 )	//라이프는 시간이 다될때 감소하도록 한다.
//					GameOver( false );
			}
		}
	}
}

function GameOver( boolin )
{
	var str;

	clearTimeout( timerID );

	nScore += nLife * 10;
	nScore += nTime * 5; // bonus점수

	if ( boolin )
	{
		str = "Congratulations! You cleared game!\n\n" + "Score : " + nScore + "\n";
		alert( str );
	}
	else
	{
		str = "Oh.. that's too bad.. try again..^^\n\n" + "Score : " + nScore + "\n";
		alert( str );
		window.close();
	}
}