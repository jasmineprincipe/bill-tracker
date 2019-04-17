package billtracker.domain;

public class Merchant {

	Long id;
	private String merchantName;
	private String merchantDescription;
	
	public Merchant() {
		
	}
	
	public Merchant(String merchantName, String merchantDescription) {
		this(null, merchantName, merchantDescription);
	}

	public Merchant(Long id, String merchantName, String merchantDescription) {
		this.id = id;
		this.merchantName = merchantName;
		this.merchantDescription = merchantDescription;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMerchantName() {
		return merchantName;
	}
	
	public void setFirstName(String merchantName) {
		this.merchantName = merchantName;
	}
	
	public String getMerchantDescription() {
		return merchantDescription;
	}
	
	public void setMerchantDescription(String merchantDescription) {
		this.merchantDescription = merchantDescription;
	}
	
}
