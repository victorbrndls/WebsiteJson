package com.harystolho;

public class API_Response {

	private String error;
	private Object data = "";

	public void setError(String error) {
		this.error = error;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getError() {
		return error;
	}

	public Object getData() {
		return data;
	}

}
