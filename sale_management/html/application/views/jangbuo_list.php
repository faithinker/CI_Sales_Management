<div class="alert mycolor1 mymargin5" role="alert">매출장</div>
<script>
	function find_text(){ //$text1은 상품명이 아니라 캘린더이다.
		form1.action="/~sale8/jangbuo/lists/text1/" + form1.text1.value+"/page";
		form1.submit();
	}
	
	//$('.date').pickadate();

	$(function() {
		$('#text1').datetimepicker({
			locale:'ko',
			format:'YYYY-MM-DD',
			defaultDate: moment()
		});

		$("#text1") .on("dp.change", function (e){
			find_text();
		});
	});
</script>
<form name="form1" action="" method="post">
	<div class="row">
		<div class="col-4" align="left">            
			<div class="input-group  input-group-sm table-sm table-sm date" id="text1">
				<div class="input-group-prepend">
						<span class="input-group-text">날짜</span>
				</div>
				
				<!--<input type="text" class="form-control js-date-picker" value="<?=$text1; ?>"">-->
				<!--<input class="date" name="date" type="date" value="<?=$text1; ?> onKeydown="if(event.keyCode == 13) {find_text();}">-->

				<input type="text" name="text1" class="form-control" value="<?=$text1; ?>"
				onKeydown="if(event.keyCode == 13) {find_text();}">
				
				<div class="input-group-append">
					<div class="input-group-text">
						<div class="input-group-addon">
							<i class="far fa-calendar-alt fa-lg"></i>
						</div>
					</div>
						<!--<button class="btn btn-primary" type="button" onClick="javascript:find_text();">검색</button>-->
				</div>
			</div>
		</div>
		<div class="col-8" align="right">
		<?
			$tmp = $text1 ? "/text1/$text1/page/$page" : "/page/$page"; 
		?>
			<a href="/~sale8/jangbuo/add<?=$tmp; ?>" class="btn btn-sm mycolor1">추가</a>
		</div>
	</div>
</form>

	<table class="table table-bordered table-sm mymargin5">
		<tr class="mycolor1">
            <td width="10%">번호</td>
            <td width="20%">날짜</td>
            <td width="20%">제품명</td>
            <td width="10%">단가</td>
            <td width="10%">수량</td>
            <td width="10%">금액</td>
            <td width="20%">비고</td>
		</tr>
<?php
	foreach ($list as $row) {                            // 연관배열 list를 row를 통해 출력한다.
		$no=$row->no8;
?>   
		<tr>
						<td><?=$no; ?></td>
						<td><?=$row->writeday8; ?></td>
						<td><a href="/~sale8/jangbuo/view/no/<?=$no ?><?=$tmp; ?>"><?=$row->product_name8; ?></a></td>
            <td><?=number_format($row->price8); ?></td>
						<td><?=number_format($row->numo8); ?></td>
            <td><?=number_format($row->prices8); ?></td>
            <td><?=$row->bigo8; ?></td>
		</tr>
<?
  }
?>
		<!--날짜 : &nbsp; -->
	</table>
	<br>
	<?=$pagination; ?>
	
<div>




