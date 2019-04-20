package billtracker.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import billtracker.dao.BillDao;
import billtracker.dao.BillJdbcDaoImpl;
import billtracker.domain.Bill;
import billtracker.domain.Merchant;

public class BillServiceImpl implements BillService{
	
	BillDao billDao;

	public BillServiceImpl() {
		this.billDao = BillJdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<Bill> findAll() {
		return billDao.findAll();
	}

	@Override
	public Bill find(Long id) {
		return billDao.find(id);
	}

	@Override
	public List<Bill> findByMerchant(Merchant merchantName) {
		return billDao.findByMerchant(merchantName);
	}

	@Override
	public void add(Bill bill) {
		if (validate(bill)) {
			billDao.add(bill);
		} else {
			throw new IllegalArgumentException("Merchant cannot be blank.");
		}
	}

	@Override
	public void upsert(Bill bill) {
		if (validate(bill)) {
			if(bill.getId() != null && bill.getId() >= 0) {
				billDao.update(bill);
			} else {
				billDao.add(bill);
			}
		} else {
			throw new IllegalArgumentException("Merchant cannot be blank.");
		}
	}

	@Override
	public void delete(Long billId) {
		billDao.delete(billId);
	}
	
	private boolean validate(Bill bill) {
		return !StringUtils.isAnyBlank(bill.getSerialNumber(), bill.getMerchantName().toString());
	}

}
