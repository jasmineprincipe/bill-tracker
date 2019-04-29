package billtracker.domain;

import java.util.Date;

public class Merchant {
	
	Long merchantId;
	private String merchantName;
	private String merchantDescription;
	
	public Merchant() {
		
	}
	
	public Merchant(String merchantName, String merchantDescription) {
		this(null, merchantName, merchantDescription);
	}

	
	public Merchant(Long merchantId, String merchantName, String merchantDescription) {
		this.merchantId = merchantId;
		this.merchantName = merchantName;
		this.merchantDescription = merchantDescription;
	}

	public Long getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}

	public String getMerchantName() {
		return merchantName;
	}
	
	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public String getMerchantDescription() {
		return merchantDescription;
	}
	
	public void setMerchantDescription(String merchantDescription) {
		this.merchantDescription = merchantDescription;
	}
}
