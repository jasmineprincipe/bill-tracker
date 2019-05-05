package billtracker.domain;

import java.math.BigDecimal;

public class History {

	Long yearDue;
	Long monthDue;
	BigDecimal totalAmount;
	
	public History() {
		
	}
	
	public History(Long yearDue, Long monthDue, BigDecimal totalAmount) {
		this.yearDue = yearDue;
		this.monthDue = monthDue;
		this.totalAmount = totalAmount;
	}
	
	public Long getYearDue() {
		return yearDue;
	}

	public void setYearDue(Long yearDue) {
		this.yearDue = yearDue;
	}

	public Long getMonthDue() {
		return monthDue;
	}

	public void setMonthDue(Long monthDue) {
		this.monthDue = monthDue;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

}
