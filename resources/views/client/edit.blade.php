@extends('layouts.app')

@section('title', 'Clients')

@section('content')

<form class="form-horizontal" method="post">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit Information</h4>
        </div>
        <div class="modal-body">
            <form class="form-horizontal" method="post">
                <div class="box-body">
                    <div class="form-group">
                        <label class="col-sm-4 control-label" for="txtid">ID</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="txtid" name="txtid" value="<?php echo $per_id;?>" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label" for="txtname">Name</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="txtname" name="txtname" value="<?php echo $per_name;?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label" for="txtsalary">Salary</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="txtsalary" name="txtsalary" value="<?php echo $per_salay;?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label" for="txtage">Age</label>
                        <div class="col-sm-6">
                            <input type="number" class="form-control" id="txtage" name="txtage" value="<?php echo $per_age;?>">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <<div class="modal-footer">
            <a href="index.php"><button type="button" class="btn btn-danger">Cancel</button> </a>
            <button type="submit" class="btn btn-primary" name="btnEdit">Save</button>
        </div>
    </div>
</form>

@stop