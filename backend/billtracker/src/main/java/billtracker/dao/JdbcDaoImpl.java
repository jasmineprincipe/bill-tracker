package billtracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import billtracker.domain.Bill;
import billtracker.domain.Merchant;

public class JdbcDaoImpl implements MerchantDao, BillDao {


	private static JdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public JdbcDaoImpl getInstance() {

		JdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new JdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private JdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:MERCHANT");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createMerchantTable();
		insertInitMerchants();
		
		createBillTable();
		insertInitBills();

	}

	private void createMerchantTable() {
		String createSql = "CREATE TABLE MERCHANTS " 
				+ "(id INTEGER IDENTITY PRIMARY KEY, " 
				+ " merchant_name VARCHAR(255) UNIQUE NOT NULL, "
				+ " merchant_description VARCHAR(255))";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitMerchants() {

		add(new Merchant("Meralco","Electricty"));
		add(new Merchant("Globe Telecom","Cellular Phones"));
		add(new Merchant("Cignal","Cable TV"));
		add(new Merchant("PLDT","Internet"));
		add(new Merchant("Maynilad","Water"));
	}

	@Override
	public List<Merchant> findAll() {

		return findByName(null);
	}

	@Override
	public Merchant find(Long id) {

		Merchant merchant = null;

		if (id != null) {
			String sql = "SELECT id, merchant_name, merchant_description FROM MERCHANTS WHERE id = ?";
			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, id.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					merchant = new Merchant(Long.valueOf(
							results.getInt("id")), 
							results.getString("merchant_name"),
							results.getString("merchant_description"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return merchant;
	}

	@Override
	public List<Merchant> findByName(String merchantName) {
		List<Merchant> merchants = new ArrayList<>();

		String sql = "SELECT id, merchant_name, merchant_description FROM MERCHANTS WHERE merchant_name LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(merchantName));
			
			ResultSet results = ps.executeQuery();
			
			while (results.next()) {
				Merchant merchant = new Merchant(Long.valueOf(
						results.getInt("id")), 
						results.getString("merchant_name"),
						results.getString("merchant_description"));
				merchants.add(merchant);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return merchants;
	}

	private String createSearchValue(String string) {
		
		String value;
		
		if (StringUtils.isBlank(string)) {
			value = "%";
		} else {
			value = string;
		}
		
		return value;
	}
	
	@Override
	public void add(Merchant merchant) {
		
		String insertSql = "INSERT INTO MERCHANTS (merchant_name, merchant_description) VALUES (?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, merchant.getMerchantName());
			ps.setString(2, merchant.getMerchantDescription());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Merchant merchant) {
		String updateSql = "UPDATE MERCHANTS SET merchant_name = ?, merchant_description = ? WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setString(1, merchant.getMerchantName());
			ps.setString(2, merchant.getMerchantDescription());
			ps.setLong(3, merchant.getId());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM MERCHANTS WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	//---------------DaoImpl for BILL--------------------------

		private void createBillTable() {
			String createSql = "CREATE TABLE BILLS " 
					+ "(bill_id INTEGER IDENTITY PRIMARY KEY, "
					+ "merchant_name VARCHAR(255) FOREIGN KEY REFERENCES MERCHANTS(merchant_name), "
					+ "amount DOUBLE, "
					+ "serial_number VARCHAR(12) UNIQUE NOT NULL, "
					+ "bill_date VARCHAR(10) NOT NULL,"
					+ "due_date VARCHAR(10) NOT NULL)";

			try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

				stmt.executeUpdate(createSql);

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		private void insertInitBills() {

			add(new Bill("Meralco", null, "123ABC", "2000-10-10", "2000-11-11"));
			add(new Bill("Maynilad", null, "961ATH", "2000-10-10", "2000-11-11"));
		}

		@Override
		public List<Bill> findAllBills() {

			return findByMerchant(null);
		}

		@Override
		public Bill findBill(Long billId) {

			Bill bill = null;

			if (billId != null) {
				String sql = "SELECT bill_id, merchant_name, amount, serial_number, bill_date, due_date WHERE bill_id = ?";
				try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

					ps.setInt(1, billId.intValue());
					ResultSet results = ps.executeQuery();

					if (results.next()) {
						bill = new Bill(Long.valueOf
								(results.getInt("bill_id")), 
								results.getString("merchant_name"),
								results.getBigDecimal("amount"),
								results.getString("serial_number"),
								results.getString("bill_date"),
								results.getString("due_date"));
					}

				} catch (SQLException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}

			return bill;
		}

		@Override
		public List<Bill> findByMerchant(String merchantName) {
			List<Bill> bills = new ArrayList<>();

			String sql = "SELECT bill_id, merchant_name, amount, serial_number, bill_date, due_date FROM BILLS WHERE merchant_name LIKE ?";

			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setString(1, createSearchValue(merchantName));

				ResultSet results = ps.executeQuery();

				while (results.next()) {
					Bill bill = new Bill(Long.valueOf
							(results.getInt("bill_id")), 
							results.getString("merchant_name"),
							results.getBigDecimal("amount"),
							results.getString("serial_number"),
							results.getString("bill_date"),
							results.getString("due_date"));
					bills.add(bill);
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}

			return bills;
		}

		@Override
		public void add(Bill bill) {

			String insertSql = "INSERT INTO BILLS (merchant_name, amount, serial_number, bill_date, due_date) VALUES (?,?,?,?,?)";

			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

				ps.setString(1, bill.getMerchantName());
				ps.setBigDecimal(2, bill.getAmount());
				ps.setString(3, bill.getSerialNumber());
				ps.setString(4, bill.getBillDate());
				ps.setString(5, bill.getDueDate());
				ps.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		@Override
		public void update(Bill bill) {
			String updateSql = "UPDATE BILLS SET merchant_name = ?, amount = ?, serial_number = ?, bill_date = ?, due_date = ? WHERE bill_id = ?";

			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

				ps.setString(1, bill.getMerchantName());
				ps.setBigDecimal(2, bill.getAmount());
				ps.setString(3, bill.getSerialNumber());
				ps.setString(4, bill.getBillDate());
				ps.setString(5, bill.getDueDate());
				ps.setLong(6, bill.getBillId());
				ps.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		@Override
		public void deleteBill(Long billId) {
			String updateSql = "DELETE FROM BILLS WHERE bill_id = ?";

			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

				ps.setLong(1, billId);
				ps.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
	}
}
