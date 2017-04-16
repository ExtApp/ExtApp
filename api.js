function removeIndex(elements) {
  while (element.firstChild){
    element.removeChild(element.fistChild);
  }
}

$(function() {
  //  クリックイベントにajax処理を登録する
  $('body').on('click', '#search', function(e) {
    //以前の要素を削除
    $('#result').empty()

    //  リクエストの下準備
    //  リクエスト時に一緒に送るデータの作成
    var send_data;
    //  テキストボックスの値を設定
    send_data = {
      keyword : $('input').val()
    };

    //  WebAPIを叩く
    $.ajax({
      //  リクエストの内容
      url: 'https://api.dmm.com/affiliate/v3/ItemList?api_id=TwNenmqLNuByU6PYguXK&affiliate_id=extapp-990&site=DMM.R18&output=json',
      //url: 'https://api.dmm.com/affiliate/v3/ActressSearch?api_id=TwNenmqLNuByU6PYguXK&affiliate_id=extapp-990&output=json',
      dataType: "jsonp",
      type:"GET",
      data: send_data,
      //  レスポンス成功時の処理
      success: function(responce) {
        $('#result').append('<h2>結果</h2>');
        console.log(responce);

        //$('#result').append(JSON.stringify(responce, null, ' '));
        var result2 = responce.result;
        for (var i = 0; i < result2.items.length; i++) {
          $('#result').append('<h3>' + (i+1) + '位： ' + result2.items[i].title + '</h3>');
          $('#result').append('<a href=\"' + result2.items[i].affiliateURL + '\">リンク</a><br/>');
          $('#result').append('<img src=\"' + result2.items[i].imageURL.large + '\" alt=\"image\"><br/>');
        }

        return false;
      },
      //  レスポンス失敗時の処理
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
        $('div[data-result=""]').html(JSON.stringify("データ取得中にエラーが発生しました。"));
        return false;
      }
    });
    //  フォーカスをテキストボックスに合わせる
    $('input').focus();

    return false;
  });
  //  Enterキーを押下した場合もトリガーとする
  $('#keyword').keypress(function(e){
    if(e.which == 13){
        $("#search").click();
      }
    });
});
