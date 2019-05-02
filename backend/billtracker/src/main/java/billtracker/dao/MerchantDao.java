package billtracker.dao;

import billtracker.domain.Bill;
import billtracker.domain.Merchant;
import java.util.List;

public interface MerchantDao {
	
	public List<Merchant> findAll();
	
	public Merchant find(Long merchantId);
	
	public List<Merchant> findByName(String merchantName);
	
	public void add(Merchant merchant);
	
	public void update(Merchant merchant);
	
	public void delete(Long merchantId);

}
