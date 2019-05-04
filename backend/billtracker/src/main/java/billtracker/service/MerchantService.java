package billtracker.service;

import java.util.List;

import billtracker.domain.Merchant;

public interface MerchantService {

	public List<Merchant> findAll();
	
	public Merchant find(Long merchantId);
	
	public List<Merchant> findByName(String merchantName);
	
	public void add(Merchant merchant);
	
	public void upsert(Merchant merchant);
	
	public void delete(Long merchantId);

}
