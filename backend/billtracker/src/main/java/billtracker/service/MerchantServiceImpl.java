package billtracker.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import billtracker.dao.MerchantDao;
import billtracker.dao.JdbcDaoImpl;
import billtracker.domain.Merchant;

public class MerchantServiceImpl implements MerchantService{
	
	MerchantDao merchantDao;

	public MerchantServiceImpl() {
		this.merchantDao = JdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<Merchant> findAll() {
		return merchantDao.findAll();
	}

	@Override
	public Merchant find(Long merchantId) {
		return merchantDao.find(merchantId);
	}

	@Override
	public List<Merchant> findByName(String merchantName) {
		return merchantDao.findByName(merchantName);
	}

	@Override
	public void add(Merchant merchant) {
		if (validate(merchant)) {
			merchantDao.add(merchant);
		} else {
			throw new IllegalArgumentException("Merchant's name cannot be blank.");
		}
	}

	@Override
	public void upsert(Merchant merchant) {
		if (validate(merchant)) {
			if(merchant.getMerchantId() != null && merchant.getMerchantId() >= 0) {
				merchantDao.update(merchant);
			} else {
				merchantDao.add(merchant);
			}
		} else {
			throw new IllegalArgumentException("Merchant's name cannot be blank.");
		}
	}

	@Override
	public void delete(Long merchantId) {
		merchantDao.delete(merchantId);
	}
	
	private boolean validate(Merchant merchant) {
		return !StringUtils.isAnyBlank(merchant.getMerchantName(), merchant.getMerchantDescription());
	}

}
